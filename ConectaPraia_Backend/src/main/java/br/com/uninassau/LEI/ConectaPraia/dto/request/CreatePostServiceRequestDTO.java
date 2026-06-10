package br.com.uninassau.LEI.ConectaPraia.dto.request;

import br.com.uninassau.LEI.ConectaPraia.domain.enums.TypeService;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;

public record CreatePostServiceRequestDTO(
        @NotBlank
        String title,

        @NotNull
        TypeService serviceType,

        @NotBlank
        String location,

        @NotNull
        @DecimalMin("0.0")
        BigDecimal value,

        @NotBlank
        String valueDescription,

        String imageUrl,

        @NotBlank
        String description
        ) {
}
