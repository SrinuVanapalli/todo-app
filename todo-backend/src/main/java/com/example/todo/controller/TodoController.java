
package com.example.todo.controller;

import com.example.todo.model.Todo;
import com.example.todo.service.TodoService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;
import com.example.todo.model.ApiError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/todos")
public class TodoController {

    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    // Get all todos
    @GetMapping
    public List<Todo> getAllTodos() {
        return todoService.getAllTodos();
    }

    // Get a todo by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getTodoById(@PathVariable Long id) {
        return todoService.getTodoById(id)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity
                        .status(404)
                        .body(new ApiError(
                                404,
                                "Todo not found with id: " + id
                        )));
    }

    // Create a todo
    @PostMapping
    public ResponseEntity<Todo> createTodo(
            @Valid @RequestBody Todo todo) {

        Todo savedTodo = todoService.createTodo(todo);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedTodo);
    }

    // Update a todo

    @PutMapping("/{id}")
    public ResponseEntity<Todo> updateTodo(
            @PathVariable Long id,
            @Valid @RequestBody Todo todo) {

        return ResponseEntity.ok(
                todoService.updateTodo(id, todo)
        );
    }


    // Delete a todo
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long id) {
        if (todoService.getTodoById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        todoService.deleteTodo(id);
        return ResponseEntity.noContent().build();
    }
}
