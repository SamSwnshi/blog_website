let name = `Test-User_${Date.now()}`;
let email = `test-user_${Date.now()}@gmail.com`;
const password = "12345678";
const avatar = "https://picsum.photos/seed/picsum/200/300";
let token;
let temp_email = email;
let user_id;
let post_id;
let total_posts;
let comment_id; 

describe('Blog App Backend Tests', () => {
    it('User should be able to Signup using his details', () => {
        cy.backendRequest({
          method: "POST",
          url: "/api/auth/register",
          body:  { "name" : `${name}`, "email" : `${email}`,  "password" : `${password}`, "avatar" : `${avatar}`},
        })
        .then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.user.name).to.eq(`${name}`);
        expect(response.body.user.email).to.eq(`${email}`);
        expect(response.body.user.avatar).to.eq(`${avatar}`);
        expect(response.body.user.role).to.eq("user");
      });
    });

    it('User should be able to Login using his email and password', () => {
      cy.backendRequest({
        method : 'POST', 
        url : `/api/auth/login`,
        body : { "email" : `${temp_email}`,  "password" : `${password}`}
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.user.name).to.eq(`${name}`);
        expect(response.body.user.email).to.eq(`${temp_email}`);
        expect(response.body.user.avatar).to.eq(`${avatar}`);
        expect(response.body.user.role).to.eq("user");
        expect(response.body.token).to.not.be.empty;
        token = response.body.token;
        user_id = response.body.user.id;
      });
    });

    it('User should be able to Create a Post', () => {
      cy.backendRequest({
        method: 'POST',
        url: `/api/posts`, // Make sure this is the correct POST endpoint
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: {
          title: "test post 1",
          content: "test post 1 content",
          tags: ["tag1", "tag2"],
          image: "https://picsum.photos/seed/picsum/200/300"
        }
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.title).to.eq("test post 1");
        expect(response.body.content).to.eq("test post 1 content");
        expect(response.body.tags).to.deep.eq(["tag1", "tag2"]);
        expect(response.body.image).to.eq("https://picsum.photos/seed/picsum/200/300");
        expect(response.body.author).to.eq(user_id);
        expect(response.body._id).to.not.be.empty;
        expect(response.body.createdAt).to.not.be.empty;
        expect(response.body.updatedAt).to.not.be.empty;
        expect(response.body.likes).to.deep.eq([]);
        expect(response.body.comments).to.deep.eq([]);
        post_id = response.body._id;
      });
    });
    
    it('User should be able to get a Post by Id', () => {
      cy.backendRequest({
        method: 'GET',
        url: `/api/posts/${post_id}`, // Make sure this is the correct POST endpoint
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.title).to.eq("test post 1");
        expect(response.body.content).to.eq("test post 1 content");
        expect(response.body.tags).to.deep.eq(["tag1", "tag2"]);
        expect(response.body.image).to.eq("https://picsum.photos/seed/picsum/200/300");
        expect(response.body.author._id).to.eq(user_id);
        expect(response.body._id).to.eq(post_id);
        expect(response.body.createdAt).to.not.be.empty;
        expect(response.body.updatedAt).to.not.be.empty;
        expect(response.body.likes).to.deep.eq([]);
        expect(response.body.comments).to.deep.eq([]);
      });
    });

    it('User should be able to Update an existing Post', () => {
      cy.backendRequest({
        method: 'PUT',
        url: `/api/posts/${post_id}`, // Make sure this is the correct POST endpoint
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: {
          title: "updated test post 1"
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.title).to.eq("updated test post 1");
        expect(response.body.content).to.eq("test post 1 content");
        expect(response.body.tags).to.deep.eq(["tag1", "tag2"]);
        expect(response.body.image).to.eq("https://picsum.photos/seed/picsum/200/300");
        expect(response.body.author).to.eq(user_id);
        expect(response.body._id).to.not.be.empty;
        expect(response.body.createdAt).to.not.be.empty;
        expect(response.body.updatedAt).to.not.be.empty;
        expect(response.body.likes).to.deep.eq([]);
        expect(response.body.comments).to.deep.eq([]);
        post_id = response.body._id;
      });
    });

    it('User should be able to get all Posts', () => {
      cy.backendRequest({
        method: 'GET',
        url: `/api/posts`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);
        total_posts = response.body.length;
      });
    });

    it('User should be able to Like a post', () => {
      cy.backendRequest({
        method : 'POST',
        url: `/api/posts/${post_id}/like`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq("Post liked");
        expect(response.body.totalLikes).to.eq(1);
      });
    });
    
    it('Anyone should be able to get User profile by Id', () => {
      cy.backendRequest({
        method: 'GET',
        url: `/api/users/${user_id}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.name).to.eq(`${name}`);
        expect(response.body.email).to.eq(`${temp_email}`);
        expect(response.body.avatar).to.eq(`${avatar}`);
        expect(response.body.postCount).to.eq(1);
        expect(response.body._id).to.eq(user_id);
      });
    });

    it('User should be able to get his own profile', () => {
      cy.backendRequest({
        method: 'GET',
        url: `/api/users/me`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.name).to.eq(`${name}`);
        expect(response.body.email).to.eq(`${temp_email}`);
        expect(response.body.avatar).to.eq(`${avatar}`);
        expect(response.body.postCount).to.eq(1);
        expect(response.body._id).to.eq(user_id);
      });
    });

    it('User should be able to Update his profile', () => {
      cy.backendRequest({
        method: 'PUT',
        url: `/api/users/me`,
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: {
          name: "Updated Test User"
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.name).to.eq("Updated Test User");
        expect(response.body.email).to.eq(`${temp_email}`);
        expect(response.body.avatar).to.eq(`${avatar}`);
        expect(response.body._id).to.eq(user_id);
      });
    });

    it('User should be able to get all his posts', () => {
      cy.backendRequest({
        method: 'GET',
        url: `/api/users/me/posts`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.eq(1);
      });
    });

    it('User should be able to Comment on a Post', () => {
      cy.backendRequest({
        method: 'POST',
        url: `/api/posts/${post_id}/comments`,
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: {
          text: "test comment 1"
        }
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.text).to.eq("test comment 1");
        expect(response.body.post).to.eq(post_id);
        expect(response.body.author).to.eq(user_id);
        expect(response.body._id).to.not.be.empty;  
        comment_id = response.body._id;
      });
    });

    it('User should be able to get all comments on a Post', () => {   
      cy.backendRequest({
        method: 'GET',
        url: `/api/posts/${post_id}/comments`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);
      });
    });  

    it('User should be able to delete his own comment', () => {
      cy.backendRequest({
        method: 'DELETE',
        url: `/api/comments/${comment_id}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq("Comment deleted successfully");
      });
    });

    it('User should be able to delete a Post', () => {
      cy.backendRequest({
        method: 'POST',
        url: `/api/posts`, // Make sure this is the correct POST endpoint
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: {
          title: "test post 2",
          content: "test post 2 content",
          tags: ["tag3", "tag4"],
          image: "https://picsum.photos/seed/picsum/200/300"
        }
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body._id).to.not.be.empty;
      });

      cy.backendRequest({
        method : 'DELETE',
        url: `/api/posts/${post_id}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq("Post deleted successfully");
      });

      cy.backendRequest({
        method: 'GET',
        url: `/api/posts`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.eq(total_posts);
      });
    });
    
});