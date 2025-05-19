
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Patient
import requests
from .serializers import PatientSerializer


@receiver(post_save, sender=Patient)
def send_to_central(sender, instance, created, **kwargs):
    central_url = "https://hospital1-backend.onrender.com/api/receive-patient/"
    central_url2 = "https://hospital1-backend.onrender.com/api/receive-patient-update/"  
    try:
        data = PatientSerializer(instance).data
        if created:
            # POST when new patient is created
            response = requests.post(central_url, json=data)
        else:
            # PUT when patient is updated (vaccination status or other)
            update_url = f"{central_url2}{instance.id}/"
            print(f"😎😎 Here is the url {update_url}")
            response = requests.put(update_url, json=data)

        if response.status_code in (200, 201):
            action = "Created" if created else "Updated"
            print(f"✅ {action} patient synced: {instance.first_name} {instance.last_name}")
        else:
            print(f"❌ Sync failed with status {response.status_code}")
    except Exception as e:
        print("🚨 Error syncing with central:", e)

