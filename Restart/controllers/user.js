const { User } = require("../models/user");

const handleGetUser = async (req, res) => {
    try {
        // Fetch all users from the database
        const allDbUsers = await User.find({});
        
        // Use map to generate <li> elements for each user
        const userListItems = `<ul>
        ${allDbUsers.map(user => `<li>${user.firstname} - ${user.email}</li>`).join('')}
        </ul>
        `;


        // Send the constructed HTML as the response
        return res.send(userListItems);
    } catch (error) {
        // Handle errors and return a 500 status if fetching users fails
        return res.status(500).send({ status: "Can't fetch users" });
    }
};

module.exports = {
    handleGetUser,
};
