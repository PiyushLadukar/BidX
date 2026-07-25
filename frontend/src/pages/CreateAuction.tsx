import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, FileText, Wallet, Paperclip, X, UploadCloud } from "lucide-react";
import toast from "react-hot-toast";
import { createAuction } from "../api/auctions";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import type { ApiError } from "../types";

const schema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Add a more detailed description"),
  category: z.string().min(1, "Enter a category"),
  quantity: z.coerce.number().positive("Enter a valid quantity"),
  starting_price: z.coerce.number().positive("Enter a starting price"),
  start_time: z.string().min(1, "Choose a start date and time"),
  end_time: z.string().min(1, "Choose an end date and time"),
});

type FormInput = z.input<typeof schema>;
type FormValues = z.output<typeof schema>;

export default function CreateAuction() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [attachments, setAttachments] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput, unknown, FormValues>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: (values: FormValues) =>
      createAuction({
        ...values,
        start_time: new Date(values.start_time).toISOString(),
        end_time: new Date(values.end_time).toISOString(),
      }),
    onSuccess: (auction) => {
      toast.success("Auction created");
      queryClient.invalidateQueries({ queryKey: ["auctions"] });
      navigate(`/auctions/${auction.id}`);
    },
    onError: (err) => {
      const message =
        (err as { response?: { data?: ApiError } })?.response?.data?.detail ??
        "Could not create the auction";
      toast.error(message);
    },
  });

  const onSubmit = (values: FormValues) => mutation.mutate(values);

  const onFilesSelected = (files: FileList | null) => {
    if (!files) return;
    setAttachments((prev) => [...prev, ...Array.from(files).map((f) => f.name)]);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link
        to="/auctions"
        className="focus-ring inline-flex items-center gap-2 text-sm font-medium text-[#6B7280] hover:text-[#111827]"
      >
        <ArrowLeft size={15} />
        Back to auctions
      </Link>

      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-[#111827]">
          Create auction
        </h1>
        <p className="mt-1 text-sm text-[#6B7280]">
          Define what you need. Verified vendors will compete to offer the
          lowest price.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
        <Card padding="lg">
          <div className="mb-5 flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EEF4FF] text-[#2563EB]">
              <FileText size={17} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-[#111827]">Procurement details</h2>
              <p className="text-xs text-[#6B7280]">What supply are you sourcing?</p>
            </div>
          </div>

          <div className="space-y-5">
            <Input
              label="Title"
              placeholder="e.g. Surgical gloves, size M — 10,000 units"
              error={errors.title?.message}
              {...register("title")}
            />

            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#111827]">
                Description
              </label>
              <textarea
                rows={4}
                placeholder="Describe the supply, specifications, and any requirements for vendors."
                className="focus-ring w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#111827] shadow-sm placeholder:text-[#9CA3AF] focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10"
                {...register("description")}
              />
              {errors.description && (
                <p className="mt-1.5 text-xs text-[#EF4444]">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Category"
                placeholder="e.g. PPE"
                error={errors.category?.message}
                {...register("category")}
              />
              <Input
                label="Quantity"
                type="number"
                min="1"
                placeholder="10000"
                error={errors.quantity?.message}
                {...register("quantity")}
              />
            </div>

          </div>
        </Card>

        <Card padding="lg">
          <div className="mb-5 flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EEF4FF] text-[#2563EB]">
              <Wallet size={17} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-[#111827]">Budget & deadline</h2>
              <p className="text-xs text-[#6B7280]">
                Set your ceiling price and when bidding closes.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Starting price (USD)"
              type="number"
              step="0.01"
              min="0"
              placeholder="5000.00"
              error={errors.starting_price?.message}
              {...register("starting_price")}
            />
            <Input
              label="Start date & time"
              type="datetime-local"
              error={errors.start_time?.message}
              {...register("start_time")}
            />
            <Input
              label="End date & time"
              type="datetime-local"
              error={errors.end_time?.message}
              {...register("end_time")}
            />
          </div>
        </Card>

        <Card padding="lg">
          <div className="mb-5 flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EEF4FF] text-[#2563EB]">
              <Paperclip size={17} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-[#111827]">Attachments</h2>
              <p className="text-xs text-[#6B7280]">
                Optional reference documents for vendors.
              </p>
            </div>
          </div>

          <label className="focus-ring flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-[#E5E7EB] bg-[#FAFAFA] px-4 py-8 text-center transition-colors hover:bg-[#F8FAFC]">
            <UploadCloud size={22} className="text-[#9CA3AF]" />
            <p className="text-sm text-[#374151]">
              <span className="font-medium text-[#2563EB]">Click to upload</span> or
              drag and drop
            </p>
            <p className="text-xs text-[#9CA3AF]">PDF, DOCX, or XLSX up to 10MB</p>
            <input
              type="file"
              multiple
              className="hidden"
              onChange={(e) => onFilesSelected(e.target.files)}
            />
          </label>

          {attachments.length > 0 && (
            <ul className="mt-4 space-y-2">
              {attachments.map((name, i) => (
                <li
                  key={`${name}-${i}`}
                  className="flex items-center justify-between rounded-xl border border-[#E5E7EB] px-3.5 py-2.5 text-sm"
                >
                  <span className="flex items-center gap-2 text-[#374151]">
                    <Paperclip size={14} className="text-[#9CA3AF]" />
                    {name}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setAttachments((prev) => prev.filter((_, idx) => idx !== i))
                    }
                    className="focus-ring text-[#9CA3AF] hover:text-[#EF4444]"
                    aria-label={`Remove ${name}`}
                  >
                    <X size={14} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => navigate("/auctions")}>
            Cancel
          </Button>
          <Button type="submit" loading={mutation.isPending}>
            Publish auction
          </Button>
        </div>
      </form>
    </div>
  );
}
