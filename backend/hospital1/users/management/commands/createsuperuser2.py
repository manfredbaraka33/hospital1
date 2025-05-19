from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

class Command(BaseCommand):
    help = "Create default superuser"

    def handle(self, *args, **options):
        User = get_user_model()
        if not User.objects.filter(username="admin").exists():
            User.objects.create_superuser(email="admin1@gmail.com", password="1234", username="admin1")

            self.stdout.write("Superuser created.")
        else:
            self.stdout.write("Superuser already exists.")
