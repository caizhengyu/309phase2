# team07

This is a CSC309 course material & discussion website.

Login accounts:
    type admin: 
        username: admin, password: admin
    type user:
        username: user, password: user
        username: user2, password: user2


Website Outline:

1. The Admin page:

    Home: Once logged in, the viewport displays the home page for admin. 
        - User status shows whether user is muted or not, and can toggol by clicking mute buttons. 
        - Admin can also delete a user.
        - Admin needs to handle requests from users. Either accept or decline, and click done to finish.

    Course Material: Admin is the only one who can change the course content.
        - add course at the very top
        - edit course material in a particular course card.


2. For both user and admin pages: (does not defeat login state)

    Profile & Post: Personal info and questions posted by the current user/admin.
        - Shared by both admin and user. (Right now) every one will see the same page. (This doesn't defeat the log in state for admin or user.)
        - user profile, bounty
        - click preview to check some half-implemented feature.
        - click post to enter a paticular post discussion.

    Post: Discussion, reply and pick best answer.
        - Only owner of a post can choose the best answer and give out the bounty.
        - general reply at the very bottom, @person reply in a particular reply box.
        - One can freely answer/reply in the post, it is fully functional and any replies will be recorded in our state.

    Forum: All the questions or discussions posted.
        - post a new question by typing info at the right hand side.
        - access a post on the left, directs to a Post page.


3. The User page:

    *Home: Once logged in, the viewport displays the main info home page for user.
        - accept or decline invites
        - don't forget the TODO list!
        *** send request to admin, such as enroll a new course, post some course material. The newly added info will display in notification, pending for admin's action.
        *** interaction still in develop, DONT SPAM THE REQUESTS!
    
    Course: The material for user who enrolled to view.
        - user cannot edit the course material.


A Few Notice:
    - Seperate admin and user by seeing the head, ("Greetings, admin" or "Greetings, user")
    - Most Posts will record the states (tested some of them), but pages such as admin home doesn't record the state, for now.
    - spam detect not supported
    - pictures searched online, delete upon request.

