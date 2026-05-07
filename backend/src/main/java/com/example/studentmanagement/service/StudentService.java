package com.example.studentmanagement.service;

import com.example.studentmanagement.dto.StudentRequestDto;
import com.example.studentmanagement.dto.StudentResponseDto;
import java.util.List;

public interface StudentService {

    StudentResponseDto createStudent(StudentRequestDto requestDto);

    List<StudentResponseDto> getAllStudents();

    StudentResponseDto getStudentById(Long id);

    StudentResponseDto updateStudent(Long id, StudentRequestDto requestDto);

    void deleteStudent(Long id);
}
