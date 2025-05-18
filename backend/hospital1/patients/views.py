from django.shortcuts import render
from rest_framework import generics,permissions,status # type: ignore
from .serializers import PatientSerializer
from .models import Patient
from django.http import JsonResponse
from django.db.models import Q
from rest_framework.decorators import api_view # type: ignore
from rest_framework.response import Response # type: ignore
from rest_framework.views import APIView # type: ignore



class PatientCreateView(generics.CreateAPIView):
    queryset=Patient.objects.all()
    serializer_class = PatientSerializer
    permission_classes=[permissions.IsAuthenticated]
    
    
patient_create_view = PatientCreateView.as_view()



class PatientListView(generics.ListAPIView):
    queryset=Patient.objects.all()
    serializer_class = PatientSerializer
    permission_classes=[permissions.IsAuthenticated]

patients_list_view = PatientListView.as_view()


class PatientDetailView(generics.RetrieveAPIView):
    queryset=Patient.objects.all()
    serializer_class = PatientSerializer
    permission_classes=[permissions.IsAuthenticated]
    
patient_details = PatientDetailView.as_view()



def search_patient(request):
    query = request.GET.get('query', '')
    if not query:
        return JsonResponse({'error': 'No search query provided'}, status=400)

    patient_results= Patient.objects.filter(
        Q(first_name__icontains=query) |
        Q(last_name__icontains=query)
    )
    
    data={
        "results":
            [{
            "id":re.id,
             "first_name":re.first_name,
              "last_name":re.last_name,
              "vaccination_status":re.vaccination_status,
              "gender":re.gender,
              "dob":re.dob,
              "hepatitis_b_stage":re.hepatitis_b_stage,
              "region":re.region,
              "treatment_status":re.treatment_status,
              "treatment_type":re.treatment_type,
              "comorbidities":re.comorbidities
              }
             for re in patient_results]
        
    }
    
    return JsonResponse(data,safe=False)



@api_view(['PATCH']) 
def toggle_vaccination_status(request, pk): 
    try: 
     patient = Patient.objects.get(pk=pk) 
    except Patient.DoesNotExist: 
     return Response(status=status.HTTP_404_NOT_FOUND) 
    patient.vaccination_status = not patient.vaccination_status 
    patient.save() 
    serializer = PatientSerializer(patient) 
    
    return Response("Good") 


