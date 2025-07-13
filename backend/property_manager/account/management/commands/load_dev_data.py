from django.core.management.base import BaseCommand
from django.core.management import call_command
import os


class Command(BaseCommand):
    help = 'Loads fictional data for development'

    def add_arguments(self, parser):
        parser.add_argument(
            '--force',
            action='store_true',
            help='Force loading even in production',
        )

    def handle(self, *args, **options):
        if not options['force'] and not os.getenv('DEV_MODE', 'false').lower() == 'true':
            self.stdout.write(
                self.style.ERROR(
                    'This command should only be executed in development environment!\n'
                    'Use --force to ignore this check or set DEV_MODE=true'
                )
            )
            return

        self.stdout.write(self.style.SUCCESS('Starting fixtures loading...'))
        
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
                self.stdout.write(f"Loading {fixture_path}...")
                call_command('loaddata', fixture_path, verbosity=0)
                self.stdout.write(
                    self.style.SUCCESS(f"{fixture_path} loaded successfully!")
                )
                success_count += 1
            except Exception as e:
                self.stdout.write(
                    self.style.ERROR(f"Error loading {fixture_path}: {str(e)}")
                )
                return

        self.stdout.write(
            self.style.SUCCESS(
                f"\nLoading completed! {success_count}/{total_count} fixtures loaded successfully."
            )
        )