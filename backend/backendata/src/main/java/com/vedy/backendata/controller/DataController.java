package com.vedy.backendata.controller;
import com.vedy.backendata.model.DataRequest;
import com.vedy.backendata.model.DataResponse;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/data")
public class DataController {

    @PostMapping("/process")
    public DataResponse processData(@RequestBody DataRequest dataRequest) {
        String userId = "Aiyush";
        String email = "an377@srmist.edu.in";
        String rollNumber = "RA2111003010285";

        List<String> numbers = new ArrayList<>();
        List<String> alphabets = new ArrayList<>();

        // Separate numbers and alphabets
        for (String item : dataRequest.getData()) {
            if (item.matches("\\d+")) {
                numbers.add(item);
            } else if (item.matches("[a-zA-Z]+")) {
                alphabets.add(item);
            }
        }

        // Find the highest alphabet
        Optional<String> highestAlphabet = alphabets.stream().max(String::compareToIgnoreCase);

        // Create response
        return new DataResponse(
                true,
                userId,
                email,
                rollNumber,
                numbers,
                alphabets,
                highestAlphabet.map(Collections::singletonList).orElse(Collections.emptyList())
        );
    }
}