# Features

Our project adds a group messaging feature, allowing users to participate in
private conversations on the Tuiter platform.

This messaging feature only works while signed in. To start using the feature,
register and log in to the Tuiter website (after deployment following
the instructions in `README.md`).

The messaging feature is available under the section labeled "Messages" on
the left panel. If you have not yet logged in, you will be redirected to the
login page. After signing in, you will be able to navigate back to the
Messages section and proceed. Once signed in, you will be able to access the
section even after navigating away.

The basic flow of messaging begins with creating a new session. In the
Messages section, there is a button to create a new message session. Once
clicked, a fresh conversation will be created, with only the creater a
member. This conversation will be added to the list of sessions, which
can be clicked to enter.

Once entered, the user will notice three major areas: the "Users in session",
the message window itself, and a text box for entering new messages. At this
point, no messages will have been sent. Under the list of current users will
be the creator of the session, and a text area for entering new members. At
this point, the creator can enter another user's username into the text area
at the top, and click the add user to session button to include a new member.
The session will update to include that user, and this action can be repeated
as necessary (note that adding the same user twice does nothing).

From the point of view of the invited member, the session they've been added
to will appear under their own messages tab, and they will now be able to
send and receive messages in that conversation, as well as invite other
members as well.

Any messages sent and received will be tagged with the sender's username
and timestamp. Messages sent by the logged in user will be highlighted blue
and right aligned, and messages by other users will be highlighted gray and
left aligned. When a new message is added to the session, the window will
scroll to the bottom to display it. Users can scroll upwards to view past
messages. The currently signed in user can click the delete icon next to
their messages to delete any sent messages.

