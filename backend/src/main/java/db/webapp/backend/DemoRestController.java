package db.webapp.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1/demo")
public class DemoRestController {
    @GetMapping
    public List<String> getDemo() {
        return List.of("Hello", "World");
    }
}
