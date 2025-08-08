import hashlib
import os
import base64

def make_django_password(password, iterations=720000, salt_length=22):
    """
    Generates a Django-compatible password hash using PBKDF2 with SHA256.

    Format: pbkdf2_sha256$<iterations>$<salt>$<base64_hash>
    """
    salt = base64.b64encode(os.urandom(salt_length)).decode('utf-8').rstrip('=')
    derived_key = hashlib.pbkdf2_hmac(
        'sha256',
        password.encode('utf-8'),
        salt.encode('utf-8'),
        iterations
    )
    hash_b64 = base64.b64encode(derived_key).decode('utf-8').strip()
    return f"pbkdf2_sha256${iterations}${salt}${hash_b64}"

password = ""
generated_hash = make_django_password(password)
print("Generated hash:")
print(generated_hash)
