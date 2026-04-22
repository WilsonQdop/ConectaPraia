package br.com.uninassau.LEI.ConectaPraia.dto.request;

import br.com.uninassau.LEI.ConectaPraia.domain.enums.Role;

public record RegisterRequestDTO(String name, String email, String cpf, String phone, String password, Role role) {
}
