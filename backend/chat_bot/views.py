from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
@csrf_exempt
def chat_response(request):
    if request.method == 'POST':
        # user_message = request.POST.get('message', '')
        ai_message = "chua co chat bot" # get_response(user_message)
        return JsonResponse({'response': ai_message})
    
    return JsonResponse({'error': 'Invalid request method'}, status=400)

#test-git