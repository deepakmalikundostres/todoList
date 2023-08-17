const express = require("express");
const todoRoute = require("../routes/todo.route");

const router = express.Router();
const defaultRoutes = [
	{
		path: "/todo",
		route: todoRoute
	}	
];

defaultRoutes.forEach((route) => {
	router.use(route.path, route.route);
});


module.exports = router;
