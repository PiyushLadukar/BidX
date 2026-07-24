class FraudDetector:
    def __init__(self) -> None:
        self.threshold = 5

    def detect(self, bid_count: int) -> bool:
        return bid_count > self.threshold
