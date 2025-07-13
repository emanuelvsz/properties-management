from django.core.management.base import BaseCommand
from django.conf import settings
import os


class Command(BaseCommand):
    help = "Load fake data only in development mode"

    def handle(self, *args, **options):
        dev_mode = os.getenv("DEV_MODE", "false").lower()
        
        if dev_mode != "true":
            self.style.ERROR(
                "DEV_MODE variable is not set to 'true'. To load fake data, set DEV_MODE=true in .env file"
            )
            return

        try:
            self.style.SUCCESS("Loading development fake data...")
            
            fixtures = [
                "inventory_categories.json",
                "inventory_items.json"
            ]
            
            for fixture in fixtures:
                fixture_path = os.path.join(settings.BASE_DIR, "inventory", "fixtures", fixture)
                if os.path.exists(fixture_path):
                    os.system(f"python manage.py loaddata {fixture_path}")
                    self.style.SUCCESS(f"Loaded {fixture}")
                else:
                    self.style.WARNING(f"Fixture not found: {fixture_path}")
            
            self.style.SUCCESS("Development fake data loaded successfully!")
            
        except Exception as e:
            self.style.ERROR(f"Error loading development fake data: {str(e)}") 