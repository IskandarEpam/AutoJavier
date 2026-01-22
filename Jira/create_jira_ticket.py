<<<<<<< HEAD
# Import the Jira library for API interactions
from atlassian import Jira
# Import requests to make direct HTTP calls for sprint management
import requests
# Import configuration variables from config.py
from config import JIRA_URL, JIRA_USERNAME, JIRA_API_TOKEN, PROJECT_KEY, ISSUE_TYPE, ASSIGNEE_ID, ADD_TO_SPRINT

# Function to create a Jira ticket and optionally add it to the active sprint
def create_ticket(summary, description="", assignee=None, add_to_sprint=ADD_TO_SPRINT):
    """
    Create a Jira ticket in the PruebaQA project
    
    Args:
        summary: Title of the ticket
        description: Description of the ticket (optional)
        assignee: Assignee account ID (optional, defaults to ASSIGNEE_ID from config)
        add_to_sprint: Whether to add the ticket to the active sprint (optional)
    
    Returns:
        Ticket key (e.g., PRUEB-5)
    """
    
    # Connect to Jira using the credentials from config
    jira = Jira(url=JIRA_URL, username=JIRA_USERNAME, password=JIRA_API_TOKEN)
    
    # Use the ASSIGNEE_ID from config if no assignee is provided
    if not assignee:
        assignee = ASSIGNEE_ID
    
    # Create a dictionary with all the ticket fields
    fields = {
        "project": {"key": PROJECT_KEY},  # Set the project to PRUEB
        "summary": summary,  # Set the ticket title
        "issuetype": {"name": ISSUE_TYPE},  # Set the issue type to Task
    }
    
    # If description is provided, add it to the fields dictionary
    if description:
        fields["description"] = description
    
    # If assignee is provided, add them to the fields dictionary
    if assignee:
        fields["assignee"] = {"accountId": assignee}
    
    # Send the request to Jira to create the issue
    issue = jira.issue_create(fields=fields)
    print(f"✓ Ticket created: {issue}")
    
    # If add_to_sprint is True, automatically move the ticket to the active sprint
    if add_to_sprint:
        try:
            # Set up authentication for REST API calls
            auth = (JIRA_USERNAME, JIRA_API_TOKEN)
            
            # Get the list of boards for the project
            board_url = f"{JIRA_URL}/rest/agile/1.0/board?projectKey={PROJECT_KEY}"
            board_response = requests.get(board_url, auth=auth)
            boards = board_response.json().get("values", [])
            
            # If boards exist, use the first one
            if boards:
                board_id = boards[0]["id"]
                
                # Get all sprints for this board
                sprints_url = f"{JIRA_URL}/rest/agile/1.0/board/{board_id}/sprint"
                sprints_response = requests.get(sprints_url, auth=auth)
                sprints = sprints_response.json().get("values", [])
                
                # Find the active sprint
                active_sprint = None
                for sprint in sprints:
                    if sprint.get("state").lower() == "active":
                        active_sprint = sprint.get("id")
                        break
                
                # If an active sprint is found, move the issue to it
                if active_sprint:
                    move_url = f"{JIRA_URL}/rest/agile/1.0/sprint/{active_sprint}/issue"
                    move_data = {"issues": [issue["key"]]}
                    move_response = requests.post(move_url, json=move_data, auth=auth)
                    if move_response.status_code == 204:
                        print(f"✓ Ticket added to active sprint")
                else:
                    print("⚠ No active sprint found")
            else:
                print("⚠ No board found for project")
        except Exception as e:
            print(f"⚠ Could not add to sprint: {e}")
    
    return issue

# This block runs only when the script is executed directly (not imported)
if __name__ == "__main__":
    # Call the create_ticket function with example values
    # The assignee will be taken from ASSIGNEE_ID in config.py
    ticket = create_ticket(
        summary="Test_Javi_Real",  # The ticket title
        description="Test ticket created via Python script"  # The ticket description
    )
    # Print the ticket key so you can see the result
=======
# Import the Jira library for API interactions
from atlassian import Jira
# Import requests to make direct HTTP calls for sprint management
import requests
# Import configuration variables from config.py
from config import JIRA_URL, JIRA_USERNAME, JIRA_API_TOKEN, PROJECT_KEY, ISSUE_TYPE, ASSIGNEE_ID, ADD_TO_SPRINT

# Function to create a Jira ticket and optionally add it to the active sprint
def create_ticket(summary, description="", assignee=None, add_to_sprint=ADD_TO_SPRINT):
    """
    Create a Jira ticket in the PruebaQA project
    
    Args:
        summary: Title of the ticket
        description: Description of the ticket (optional)
        assignee: Assignee account ID (optional, defaults to ASSIGNEE_ID from config)
        add_to_sprint: Whether to add the ticket to the active sprint (optional)
    
    Returns:
        Ticket key (e.g., PRUEB-5)
    """
    
    # Connect to Jira using the credentials from config
    jira = Jira(url=JIRA_URL, username=JIRA_USERNAME, password=JIRA_API_TOKEN)
    
    # Use the ASSIGNEE_ID from config if no assignee is provided
    if not assignee:
        assignee = ASSIGNEE_ID
    
    # Create a dictionary with all the ticket fields
    fields = {
        "project": {"key": PROJECT_KEY},  # Set the project to PRUEB
        "summary": summary,  # Set the ticket title
        "issuetype": {"name": ISSUE_TYPE},  # Set the issue type to Task
    }
    
    # If description is provided, add it to the fields dictionary
    if description:
        fields["description"] = description
    
    # If assignee is provided, add them to the fields dictionary
    if assignee:
        fields["assignee"] = {"accountId": assignee}
    
    # Send the request to Jira to create the issue
    issue = jira.issue_create(fields=fields)
    print(f"✓ Ticket created: {issue}")
    
    # If add_to_sprint is True, automatically move the ticket to the active sprint
    if add_to_sprint:
        try:
            # Set up authentication for REST API calls
            auth = (JIRA_USERNAME, JIRA_API_TOKEN)
            
            # Get the list of boards for the project
            board_url = f"{JIRA_URL}/rest/agile/1.0/board?projectKey={PROJECT_KEY}"
            board_response = requests.get(board_url, auth=auth)
            boards = board_response.json().get("values", [])
            
            # If boards exist, use the first one
            if boards:
                board_id = boards[0]["id"]
                
                # Get all sprints for this board
                sprints_url = f"{JIRA_URL}/rest/agile/1.0/board/{board_id}/sprint"
                sprints_response = requests.get(sprints_url, auth=auth)
                sprints = sprints_response.json().get("values", [])
                
                # Find the active sprint
                active_sprint = None
                for sprint in sprints:
                    if sprint.get("state").lower() == "active":
                        active_sprint = sprint.get("id")
                        break
                
                # If an active sprint is found, move the issue to it
                if active_sprint:
                    move_url = f"{JIRA_URL}/rest/agile/1.0/sprint/{active_sprint}/issue"
                    move_data = {"issues": [issue["key"]]}
                    move_response = requests.post(move_url, json=move_data, auth=auth)
                    if move_response.status_code == 204:
                        print(f"✓ Ticket added to active sprint")
                else:
                    print("⚠ No active sprint found")
            else:
                print("⚠ No board found for project")
        except Exception as e:
            print(f"⚠ Could not add to sprint: {e}")
    
    return issue

# This block runs only when the script is executed directly (not imported)
if __name__ == "__main__":
    # Call the create_ticket function with example values
    # The assignee will be taken from ASSIGNEE_ID in config.py
    ticket = create_ticket(
        summary="Test_Javi_Real",  # The ticket title
        description="Test ticket created via Python script"  # The ticket description
    )
    # Print the ticket key so you can see the result
>>>>>>> 6586b47195aad1462b374af491d159ab2810b05f
    print(f"Ticket key: {ticket}")