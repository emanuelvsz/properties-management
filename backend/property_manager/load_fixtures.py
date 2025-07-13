"""
Script to load all system fixtures.
This script should only be executed in development environment.
"""

import os
import django
from django.core.management import call_command
from django.conf import settings

def load_fixtures():
    """Loads all system fixtures in dependency order."""
    
    if not os.getenv('DEV_MODE', 'false').lower() == 'true':
        print("This script should only be executed in development environment!")
        print("Set the environment variable DEV_MODE=true")
        return False
    
    print("Starting fixtures loading...")
    
    fixtures = [
        ('account', 'users.json'),
        ('tenant', 'tenants.json'),
        ('property', 'properties.json'),
        ('rent_contract', 'rent_contracts.json'),
        ('expense', 'expenses.json'),
        ('rent_payment', 'rent_payments.json'),
        ('inventory', 'categories.json'),
        ('inventory', 'items.json'),
    ]
    
    success_count = 0
    total_count = len(fixtures)
    
    for app_name, fixture_file in fixtures:
        fixture_path = f"{app_name}/fixtures/{fixture_file}"
        
        try:
            print(f"Loading {fixture_path}...")
            call_command('loaddata', fixture_path, verbosity=0)
            print(f"{fixture_path} loaded successfully!")
            success_count += 1
        except Exception as e:
            print(f"Error loading {fixture_path}: {str(e)}")
            return False
    print(f"\nLoading completed! {success_count}/{total_count} fixtures loaded successfully.")
    return True

if __name__ == '__main__':
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'property_manager.settings')
    django.setup()
    load_fixtures() 