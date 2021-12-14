Backend (Node.js):
1. Base 
2. Route registration
    2.1 Homepage route
    2.2 Current post route
    2.3 Auth/regist route
    2.4 Playlists route
3. Module implementation / fix
    // 3.1 User        
    // 3.2 Post        
    // 3.3 Comments    
    // 3.4 Playlists   
4. Logics to implement
    4.1 AUTHORIZATION / REGISTRATION !!!
    4.2 Video/audio placement on the server (POST)
        4.2.1 File uploading ?
        4.2.2 Connecting it with Mongo
    4.3 Edit/delete posts
    4.4 Sort posts by categories (most relevant, most liked, newer, older)
    4.5 AuthUser-only:
        4.5.1 Place a comment to a current post
        4.5.2 Like the post
        4.5.3 Create/edit/remove an own playlist
        4.5.4 Add/remove posts to playlist 
    4.6 Pagination
    4.7 REST API (Connecting Node.js to React)
    4.8 Searh posts
5. All forms/inputs server-side validation !
6. Working with cookies ?
7. Non-auth Users - view/listen to no more than 10 posts !





Frontend (React):  //try to build it on functional components - learn how to use hooks!
1. HomePage!
2. Routing
3. Redux Global State / implement the State
4. Pages to render:
    4.1 Current video/audio page
    4.2 Regist/auth page
    4.3 Playlists (auth users only!)
    4.4 Liked posts (to a current User)
    4.5 Admin page
5. REST API (Connecting Node.js to React)
6. Working with localStorage ?
7. All forms/input client-side validation !
8. Client-side authentication !
9. Non-auth Users - view/listen to no more than 10 posts ! (localStorage ?)
10. Search for a posts !
11. Styling 