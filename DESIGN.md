# Design

## Backend

Our design revolved around two new backend datatypes, the `Message` and
`MessageSession`:

```
  Message {
    (_id)
    message: string,
    sender: User,
    timestamp: Date,
    session: MessageSession
  }

  MessageSession {
    (_id)
    members: User[]
  }
```

The primary `Message` type stores the content (`message`), the user who
sent it (`sender`), the time it was sent on (`timestamp`), and the session
it was sent in (`session`). The `MessageSession` type acts as a collection
of messages, with the `members` field as a sort of "access rights" to those
messages: only users in the `members` field can send or receive messages in
that session.

Sending a message to a session consists of creating a new `Message` object
with `session` set to the destination `MessageSession`. All `members` of that
`MessageSession` will receive the message, and again the `members` field
acts as a check to ensure only permitted users are allowed "read/write"
privileges.

To implement these backend features, the two datatypes were created along
with the usual corresponding friends: Mongoose models and
interfaces/implementations of the DAOs and controllers for both `Message`s
and `MessageSession`s, respectively. We exposed a REST API for
  
  * creation/deletion of `Message`s
  * creation/deltion of `MessageSession`s
  * adding users to `MessageSession`

along with various helper API methods for common tasks such as querying
existing data.

## Frontend

The frontend components were focused on the "Messages" tab found on the left
panel. We ensured a user was properly logged in before being able to access
this tab, using the profile functionality.

Two main components were created: one for listing the available sessions
after clicking the Messages tab, and one for actually displaying the message
session and its contents. All new functionality was placed under
`src/components/messages`, besides the minor service wrappers around our
backend API. The major components were broken down into smaller pieces:

  * the `index.js` (`Messages`) hosts the create new session button, and
    delegates displaying individual session info to the `Session` component.
  * `MessageSessionScreen` delegates the actual heavy lifting to
    `MessageSession`, which handles adding users, creating new messages, and
     displaying messages. The actual `Messages` component handles displaying
     individual `Message` components.

Due to not using something more complicted like Websockets for our messaging
API, we relied on a simple polling method to keep the messages in sync for
all users in a conversation. At a set interval, the REST API was hit for
new messages.


