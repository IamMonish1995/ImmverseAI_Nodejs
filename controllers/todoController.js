import TodosModel from "../models/Todos.js";

class TodoController {
  static Todolist = async (req, res) => {
    const userId = req.user._id;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    try {
      const todos = await TodosModel.find({ userId })
        .skip((page - 1) * pageSize)
        .limit(pageSize);
      const totalTodos = await TodosModel.countDocuments({ userId });
      res.send({
        status: "success",
        message: "Todos Retrived succesfully",
        result: {
          page,
          pageSize,
          totalTodos,
          totalPages: Math.ceil(totalTodos / pageSize),
          todos,
        },
      });
    } catch (err) {
      res.send({
        status: "failed",
        message: "Something went wrong",
        error: err.message,
      });
    }
  };
  static CreateTodo = async (req, res) => {
    const { title, description } = req.body;
    const userId = req.user._id;

    try {
      const newTodo = new TodosModel({
        userId,
        title,
        description,
      });
      const savedTodo = await newTodo.save();

      res.send({
        status: "success",
        message: "Todo added successfully",
        result: savedTodo,
      });
    } catch (err) {
      res.send({
        status: "failed",
        message: "Something went wrong",
        error: err.message,
      });
    }
  };
  static UpdateTodo = async (req, res) => {
    const { title, description, completed, id } = req.body;
    console.log({title, description, completed, id});
    try {
      const updatedTodo = await TodosModel.findByIdAndUpdate(
        id,
        { title, description, completed },
        { new: true }
      );
      res.send({
        status: "success",
        message: "Todo updated successfully",
        result: updatedTodo,
      });
    } catch (err) {
      res.send({
        status: "failed",
        message: "Something went wrong",
        error: err.message,
      });
    }
  };
  static DeleteTodo = async (req, res) => {
    try {
      const { id } = req.body;

      await TodosModel.findByIdAndDelete(id);

      res.send({
        status: "success",
        message: "Todo deleted successfully",
      });
    } catch (err) {
      res.send({
        status: "failed",
        message: "Something went wrong",
        error: err.message,
      });
    }
  };
}

export default TodoController;
