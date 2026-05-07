package com.example.studentmanagement.service.impl;

import com.example.studentmanagement.dto.StudentRequestDto;
import com.example.studentmanagement.dto.StudentResponseDto;
import com.example.studentmanagement.entity.Student;
import com.example.studentmanagement.exception.DuplicateResourceException;
import com.example.studentmanagement.exception.ResourceNotFoundException;
import com.example.studentmanagement.repository.StudentRepository;
import com.example.studentmanagement.service.StudentService;
import java.util.Comparator;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;

    @Override
    public StudentResponseDto createStudent(StudentRequestDto requestDto) {
        String email = normalize(requestDto.getEmail());

        if (studentRepository.existsByEmailIgnoreCase(email)) {
            throw new DuplicateResourceException("A student with this email already exists");
        }

        Student student = Student.builder()
                .firstName(clean(requestDto.getFirstName()))
                .lastName(clean(requestDto.getLastName()))
                .email(email)
                .department(clean(requestDto.getDepartment()))
                .city(clean(requestDto.getCity()))
                .build();

        return toResponseDto(studentRepository.save(student));
    }

    @Override
    @Transactional(readOnly = true)
    public List<StudentResponseDto> getAllStudents() {
        return studentRepository.findAll()
                .stream()
                .sorted(Comparator.comparing(Student::getId).reversed())
                .map(this::toResponseDto)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public StudentResponseDto getStudentById(Long id) {
        return toResponseDto(findStudentOrThrow(id));
    }

    @Override
    public StudentResponseDto updateStudent(Long id, StudentRequestDto requestDto) {
        Student student = findStudentOrThrow(id);
        String email = normalize(requestDto.getEmail());

        studentRepository.findByEmailIgnoreCase(email)
                .filter(existingStudent -> !existingStudent.getId().equals(id))
                .ifPresent(existingStudent -> {
                    throw new DuplicateResourceException("A student with this email already exists");
                });

        student.setFirstName(clean(requestDto.getFirstName()));
        student.setLastName(clean(requestDto.getLastName()));
        student.setEmail(email);
        student.setDepartment(clean(requestDto.getDepartment()));
        student.setCity(clean(requestDto.getCity()));

        return toResponseDto(studentRepository.save(student));
    }

    @Override
    public void deleteStudent(Long id) {
        Student student = findStudentOrThrow(id);
        studentRepository.delete(student);
    }

    private Student findStudentOrThrow(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
    }

    private StudentResponseDto toResponseDto(Student student) {
        return StudentResponseDto.builder()
                .id(student.getId())
                .firstName(student.getFirstName())
                .lastName(student.getLastName())
                .email(student.getEmail())
                .department(student.getDepartment())
                .city(student.getCity())
                .build();
    }

    private String clean(String value) {
        return value == null ? null : value.trim();
    }

    private String normalize(String value) {
        return clean(value).toLowerCase();
    }
}
