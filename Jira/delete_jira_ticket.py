<<<<<<< HEAD
import requests
from config import JIRA_URL, JIRA_USERNAME, JIRA_API_TOKEN, TICKETS_TO_DELETE

# Function to delete a Jira ticket
def delete_ticket(ticket_key):
    """
    Delete a Jira ticket by its key
    
    Args:
        ticket_key: The ticket key (e.g., PRUEB-4)
    
    Returns:
        True if successful, False otherwise
    """
    # Set up authentication
    auth = (JIRA_USERNAME, JIRA_API_TOKEN)
    
    try:
        # First get the issue to get its ID
        get_url = f"{JIRA_URL}/rest/api/2/issue/{ticket_key}"
        get_response = requests.get(get_url, auth=auth)
        
        if get_response.status_code == 200:
            issue_id = get_response.json().get("id")
            
            # Delete using the ID
            delete_url = f"{JIRA_URL}/rest/api/2/issue/{issue_id}"
            delete_response = requests.delete(delete_url, auth=auth)
            
            if delete_response.status_code == 204:
                print(f"✓ Ticket {ticket_key} deleted successfully")
                return True
            else:
                print(f"⚠ Could not delete {ticket_key}: {delete_response.text}")
                return False
        else:
            print(f"⚠ Could not find {ticket_key}: {get_response.text}")
            return False
    except Exception as e:
        print(f"⚠ Could not delete {ticket_key}: {e}")
        return False

# This block runs only when the script is executed directly (not imported)
if __name__ == "__main__":
    print(f"Deleting {len(TICKETS_TO_DELETE)} tickets...")
    for ticket in TICKETS_TO_DELETE:
        delete_ticket(ticket)
    
=======
import requests
from config import JIRA_URL, JIRA_USERNAME, JIRA_API_TOKEN, TICKETS_TO_DELETE

# Function to delete a Jira ticket
def delete_ticket(ticket_key):
    """
    Delete a Jira ticket by its key
    
    Args:
        ticket_key: The ticket key (e.g., PRUEB-4)
    
    Returns:
        True if successful, False otherwise
    """
    # Set up authentication
    auth = (JIRA_USERNAME, JIRA_API_TOKEN)
    
    try:
        # First get the issue to get its ID
        get_url = f"{JIRA_URL}/rest/api/2/issue/{ticket_key}"
        get_response = requests.get(get_url, auth=auth)
        
        if get_response.status_code == 200:
            issue_id = get_response.json().get("id")
            
            # Delete using the ID
            delete_url = f"{JIRA_URL}/rest/api/2/issue/{issue_id}"
            delete_response = requests.delete(delete_url, auth=auth)
            
            if delete_response.status_code == 204:
                print(f"✓ Ticket {ticket_key} deleted successfully")
                return True
            else:
                print(f"⚠ Could not delete {ticket_key}: {delete_response.text}")
                return False
        else:
            print(f"⚠ Could not find {ticket_key}: {get_response.text}")
            return False
    except Exception as e:
        print(f"⚠ Could not delete {ticket_key}: {e}")
        return False

# This block runs only when the script is executed directly (not imported)
if __name__ == "__main__":
    print(f"Deleting {len(TICKETS_TO_DELETE)} tickets...")
    for ticket in TICKETS_TO_DELETE:
        delete_ticket(ticket)
    
>>>>>>> 6586b47195aad1462b374af491d159ab2810b05f
    print("\n✓ All tickets deleted!")