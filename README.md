
<h1 align="center">Welcome to Pour'd 👋</h1>
<p>
  <a href="https://github.com/nicolyoshikawa/pour-d/wiki" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
</p>

> [Pour'd](https://pourd.onrender.com/) is a clone of Untappd created by Eric Kinder, Nicol Yoshikawa, and Huey Nguyen. This is a work in progress because creativity is at an all-time low after completing this project. (Summary of what the project is and what it does)

![image](https://github.com/nicolyoshikawa/pour-d/assets/78172054/c4d9ef19-e79c-4fe0-8804-e1164b621846)

### 🏠 [Homepage](https://pourd.onrender.com/home)

## Table of Contents

 - [Installing/Getting Started](https://github.com/nicolyoshikawa/pour-d/blob/huey-readme-edit/README.md#installation)
	 - [Initial Configuration](https://github.com/nicolyoshikawa/pour-d/blob/huey-readme-edit/README.md#initial-configuration)
- [Screenshots](https://github.com/nicolyoshikawa/pour-d/blob/huey-readme-edit/README.md#screenshots)
- [Technologies Used](https://github.com/nicolyoshikawa/pour-d/blob/huey-readme-edit/README.md#technologies-used)
- [Wiki Documents](https://github.com/nicolyoshikawa/pour-d/blob/huey-readme-edit/README.md#wiki-documents)
	- API Routes
 	- Database Schema
 	- Features
 	- Frontend Routes
 	- React Components
 	- Redux Store Tree
	- User Stories
	- Wireframes 
- [To-Dos/Future Features](https://github.com/nicolyoshikawa/pour-d/blob/huey-readme-edit/README.md#to-dosfuture-features)
- [Technical Implementation Details](https://github.com/nicolyoshikawa/pour-d/blob/huey-readme-edit/README.md#technical-implementation-details)
	- Challenges
	- Code Snippets
- [Authors](https://github.com/nicolyoshikawa/pour-d/blob/huey-readme-edit/README.md#authors)
- [Show your support](https://github.com/nicolyoshikawa/pour-d/blob/huey-readme-edit/README.md#show-your-support)

## Installation 
Provide step-by-step instructions on how to install and run your project locally.
```sh
install command here
```
### Initial Configuration

## Screenshots
Include screenshots or GIFs showcasing your application's features.

Login

![image](https://github.com/nicolyoshikawa/pour-d/assets/78172054/ac0d5485-27b7-440e-a824-28df365977e4)

Profile

![ezgif com-gif-maker](https://github.com/nicolyoshikawa/pour-d/assets/112415366/411fb169-c4b6-4530-b77c-d4d6473de871)

Drinks

https://github.com/nicolyoshikawa/pour-d/assets/112415366/f89fecdf-d4a3-4b8c-854e-49713ac7fb34

Reviews

Friends



## Technologies Used

Pour'd was built using the following technologies:

- Python
- Flask
- SQLAlchemy/Alembic
- WTForms
- JavaScript
- React
- Redux

## [Wiki Documents](https://github.com/nicolyoshikawa/pour-d/wiki)
- [API Routes](https://github.com/nicolyoshikawa/pour-d/wiki/Backend-Routes)
- [Database Schema](https://github.com/nicolyoshikawa/pour-d/wiki/Database-Schema)
- [Features](https://github.com/nicolyoshikawa/pour-d/wiki/Feature-List)
- [Frontend Routes](https://github.com/nicolyoshikawa/pour-d/wiki/Frontend-Routes)
- [React Components](https://github.com/nicolyoshikawa/pour-d/wiki/React-Components)
- [Redux Store Tree](https://github.com/nicolyoshikawa/pour-d/wiki/Redux-Store-Tree)
- [User Stories](https://github.com/nicolyoshikawa/pour-d/wiki/User-Stories)
- [Wireframes](https://github.com/nicolyoshikawa/pour-d/wiki/Wireframes)


## To-Dos/Future Features

The project is fully functional in its current state, but some other features we would like to implement in the future include:

- Ability to upload images for drinks and reviews with AWS
- Fully featured friends system with ability to view other users profiles and send friend requests
- "Load more" style pagination when viewing all drinks or reviews

## Technical Implementation Details

Explain any complex or interesting technical details of your project.

### Challenges

Describe any challenges you faced during the development process and how you overcame them.

### Code Snippets

**Search box component**
```javascript
    const dispatch = useDispatch()

    const drinks = useSelector(state => state.drinks) // Load all drinks for search bar to query
    const [searchInput, setSearchInput] = useState("") // Set current query to user's input
    let hideDiv // Used for removing border if search results are empty

    useEffect(() => {
        dispatch(loadAllDrinks())
    }, [dispatch])

    const onClickHandler = () => {
        setSearchInput("")
    }


    if (drinks) {
        // Create array of drinks with name matching current input from user
        let filterDrinks = Object.values(drinks).filter((drink) => {
            if (searchInput.length && drink.name.toLowerCase().includes(searchInput.toLowerCase())) {
                return drink
            }
        })

        // Remove border if results are empty
        if (searchInput.length && filterDrinks.length) {
            hideDiv = "results"
        } else {
            hideDiv = "results-hide"
        }
    return (
	...
	)}
```

## Authors

👤 **Eric Kidner, Nicol Yoshikawa, and Huey Nguyen**

* Eric's [Github](https://github.com/etkndr) and [LinkedIn](https://www.linkedin.com/in/eric-kinder-799097288/)
* Nicol's [Github](https://github.com/nicolyoshikawa) and [LinkedIn](https://www.linkedin.com/in/nicol-yoshikawa/)
* Huey's [Github](https://github.com/Syndux) and [LinkedIn](https://www.linkedin.com/in/huey-nguyen/)


## Show your support

Give a ⭐️ if this project helped you!
