![ga_cog_large_red_rgb](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png)

# pub-quiz-sei-project
Software Engineering Immersive: Project 3 (Group Project)

This was a group project that we were assigned as a team of four, for the Software Engineering Immersive at General Assembly London (Week 9) built with React.js and Node.js.

## Team members:
- Adrian Cusniriuc (https://github.com/Adriancusniriuc)
- Clare Roberts (https://github.com/flare222)
- David Campbell (https://github.com/davidcampbell-01)
- Xuan Wang (https://github.com/mmxw)

## Built With

1. HTML5
2. SCSS
3. JavaScript
   * ECMAScript6
   * React.js
   * Node.js
   * Express.js
   * Axios
4. NoSQL
   * MongoDB
5. Testing
   * Manual: Insomnia
   * Automated: Mocha & Chai
5. GitHub

# User Experience

## Login & Register

The user is required to register if they intend to make any posts to any of our database models. For instance, the 'Like' and 'Add Pub' buttons on the Pub Show page will be invisible unless the user is registered and logged in. The register function also determined whether the email address is of valid format and will prompt the user in the case that they have entered and email address incorrectly. The interface also returns an error if the user has entered an email address that is associated with a pre-existing account.

<img src="src/assets/screenshots/register.png" width=700>

#
## Profile

The user profile has several attributes that the user has the option to complete. These include: favourite drinks, personality type, bio, age, gender, quiz strengths and an optional profile image. The profile image is hosted by Cloudinary.

<img src="src/assets/screenshots/register-cont.png" width=700>

#
## Homepage

The homepage is the first page the user will see when they navigate to the URL. It shows minimal content, such as logo, background image and the nav bar.

<img src="src/assets/screenshots/home-page.png" width=700>

#
## Posting/editing/deleting a new pub

The user can post, edit and delete a pub once they are logged in. The new pub page will show the field of required information that the user needs to input for a new pub to be added. If the user wished to edit the pub, they will be navigated to the form with the fields pre-populated with the existing information. Note that only the user who created the pub has the ability to edit or delete it.

<img src="src/assets/screenshots/pub-create.png" width=700>

#
## Posting/editing/deleting a new event

The event schema is nested within the pub schema. This is because each event is specific to a pub. For a user to create a new event, they must first log in and then navigate to the 'Events' or 'Pub Show' page, where they will be presented with a button that displays the form for a new event to be created. As with pub creation, each event can only be edited or deleted by the user that created it, however any user is able to create a team within the event.

<img src="src/assets/screenshots/event-create.png" width=700>

#
## Posting/editing/deleting a new team

The team schema is nested within the event schema, as each team belongs to a specific event. The team captain is shown as the user who created the team at first, however the captain is able to remove themselves and re-join if they so wish. The 'captain' is set as the zero index of the team members array.

<img src="src/assets/screenshots/team-create.png" width=700>

#
## Planning

-- BACKEND --

The backend of the app was developed first and foremost using MongoDB. This was necessary in order for the functions to operate correctly and render properly on the frontend. A first structure of the backend was primarily developed, and changes were made throughout the duration of the project in response to issues that needed addressing and when functionality was added.

The following diagram illustrates the relationship between various models used within our database:

<img src="src/assets/relational-map.png" width=400 height=400>

The above model demonstrates which data elements are nested within which model (found in the 'models' folder) and how they relate to the other. A dashed line with a triple-linear attachment to the model indicated that said model is supplied with many forms of the data coming from the connected model, whilst a dashed line with a single-linear attachment after indicated that said model is supplied with one form of the data coming from the connected model. For example, the 'pubs' model is connected to the 'star rating' model via a dashed line that is connected to the 'pubs' model using a singular connector, and the 'star rating' model using a triple connector, indicating that one pub can have many star ratings, and a single star rating can only belong to one pub.

-- FRONTEND --

The frontend was developed using React.js and Axios for communication with the backend. We started developing the frontend on the second day of the project, in order to maximize our time and use the time we had efficiently. We have implemented the use of various concepts that we have learned over the preceding several weeks leading up to the development of this application.

The frontend is separated into six separate directories, all located within the 'components' directory which is located in 'src'. Each folder and nested file have been named to reflect the functionality of the file. For example, 'auth' contains files necessary for the correct execution of the login and register functions, and for the protection of access to certain member-only features within the site.

Login is necessary for a user to access features such as the creation, edition and deletion of data within models; a user must be logged in to create a new event, pub or team. This was achieved through the development of the 'authorization.js' file in the 'lib' directory located in the back end. This file has been imported wherever a change to the page needs to reflect if the user is logged in and who the user is. For example, a post request to the 'teams' section of the API requires a token, reflected in the following section of code:
``` handleSubmit = async e => {
    e.preventDefault()
    const eventId = this.props.match.params.id
    try {
      await axios.post(`/api/events/${eventId}/teams`, this.state.team, {
        headers: { Authorization: `Bearer ${Authorization.getToken()}` }
      })
      this.props.history.push(`/events/${eventId}`)
    } catch (error) {
      console.log(error)
    }
  }
```

Meanwhile, a ternary statement was used to discern if the user was logged in to be able to show the button to create a new pub:
```
  {Authorization.isAuthenticated() ?
    <Link to="/pubs/new">
      <button
        className="button"
        type="button">New Pub</button>
    </Link>
    : null}
```

The isOwner() identifier was used to discern if a user's profile belonged to the currently logged in user. If this is a match, the 'edit' button will appear:
```
isOwner = () => Authorization.getPayload().sub === this.state.user._id

render() {
    const userId = this.props.match.params.id
    return(
      {this.isOwner() && <Link to={`/profiles/${userId}/edit`}>
              <button type="button" className="button">Edit Profile</button>
            </Link>}
    )
}

export default Profile
```

## Project Management

We structured the ten days we had as follows:
Day 1:
  - Planning and assignment of tasks

Day 2:
  - Began backend development
  - Seed development
  - Tests
  - Start of frontend development

Day 3 - Day 8:
  - Continual changes to backend as issues were discovered
  - Development of frontend
  - Testing using Mocha and Chai

Day 9:
 - Fixing errors so that minimum viable product can be showcased
 - Begin styling

Day 10:
 - Continued amendments to code for added features
 - Finishing touches to styling

## Challenges & future improvements

I believe we produced an exceptional amount of work and to a high standard for the ten days we had to produce this project, working very well as a team with ambitious goals and a can-do approach to problem solving.

Given more time, the added features we wanted to implement include the capability of an instant messaging feature, the ability to take payments for pub quizzes and for the app to display who has paid in the team, the ability to 'buy a pint' for other users. Additionally, more time would ideally have been allocated to styling the site, however we collectively agreed that the application's functionality was of higher importance.

The app has some errors that require addressing. The first I would like to address relates to the functionality that allows users to add and remove themselves to teams within the quiz. At present, it is possible to belong to two teams at the same time; this is a bug that needs addressing so that any one user can only belong to a single team whilst they are not a member of any others. The 'add to team' function is also only visible from the front end at present, meaning when the page is refreshed the data reverts back to its original state. The reason for this was due to the time crunch we experienced when developing the application, as this was a feature we left until later and required for demonstration. It would also be good if a single user could only belong to one event at any given time, as the way the app is configured currently allows users to be able to belong to multiple teams at various pubs simultaneously. We would have liked to achieve this and have all current attending events visible to the user through the profile view page. Finally, the current team captain does not change in the case that the user who created the team leaves; we tried to set the team captain as the '0' index of the members array, however it wasn't rendering properly in the frontend.

Additionally, a user is currently able to add multiple star ratings to a single pub, which is a big that needs addressing. We would achieve this through the use of the .contains() method on the star rating array, as the array is set up to consist of objects which has the user data nested within; the star rating number simply returns the sum of all ratings divided by the length of how many users have left a star rating.