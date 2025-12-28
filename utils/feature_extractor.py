import math
import string

def calculate_entropy(password: str) -> float:
    """
    Calculate Shannon entropy of a password
    """
    if not password:
        return 0.0

    probability = [password.count(c) / len(password) for c in set(password)]
    entropy = -sum(p * math.log2(p) for p in probability)

    return entropy


def extract_features(password: str) -> list:
    """
    Extract numerical features from password for ML model
    """
    return [
        len(password),
        sum(1 for c in password if c.isupper()),
        sum(1 for c in password if c.islower()),
        sum(1 for c in password if c.isdigit()),
        sum(1 for c in password if c in string.punctuation),
        calculate_entropy(password)
    ]
