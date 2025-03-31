from enum import Enum

class PaymentMethod(Enum):
    DEBIT = "debit"
    MONEY = "money"
    CREDIT = "credit"
    
    @classmethod
    def choices(cls):
        return [(x.value, x.name.replace("_", " ").title()) for x in cls]
