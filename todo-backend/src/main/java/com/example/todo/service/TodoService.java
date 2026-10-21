package com.example.todo.service;

import com.example.todo.model.Todo;
import com.example.todo.repository.TodoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import com.example.todo.exception.TodoNotFoundException;
@Service
public class TodoService {

    private final TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    public Optional<Todo> getTodoById(Long id) {
        return todoRepository.findById(id);
    }

    public Todo createTodo(Todo todo) {
        return todoRepository.save(todo);
    }

    public Todo updateTodo(Long id, Todo updatedTodo) {
        return todoRepository.findById(id)
                .map(existingTodo -> {
                    existingTodo.setTitle(updatedTodo.getTitle());
                    existingTodo.setDescription(updatedTodo.getDescription());
                    existingTodo.setCompleted(updatedTodo.isCompleted());
                    existingTodo.setPriority(updatedTodo.getPriority());
                    existingTodo.setDueDate(updatedTodo.getDueDate());
                    return todoRepository.save(existingTodo);
                })
                .orElseThrow(() ->
                        new TodoNotFoundException(
                                "Todo not found with id: " + id
                        )
                );
    }

    public void deleteTodo(Long id) {
        todoRepository.deleteById(id);
    }
}
