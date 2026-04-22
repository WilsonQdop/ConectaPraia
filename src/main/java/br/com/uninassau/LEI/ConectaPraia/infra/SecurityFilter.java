package br.com.uninassau.LEI.ConectaPraia.infra;

import br.com.uninassau.LEI.ConectaPraia.TokenService;
import br.com.uninassau.LEI.ConectaPraia.domain.User;
import br.com.uninassau.LEI.ConectaPraia.repositories.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

@Component
public class SecurityFilter extends OncePerRequestFilter {

    private final UserRepository userRepository;
    private final TokenService tokenService;

    public SecurityFilter(UserRepository userRepository, TokenService tokenService) {
        this.userRepository = userRepository;
        this.tokenService = tokenService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String token = this.recoverToken(request);
        String login = tokenService.validateToken(token);

        if(login != null) {
            User user = userRepository.findByEmail(login).orElseThrow(() ->
                    new UsernameNotFoundException("Usuário não encontrado"));
            List<SimpleGrantedAuthority> authorities = Collections.singletonList
                    (new SimpleGrantedAuthority("ROLE_" + user.getRole().name()));
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken
                    (
                            user,
                            null,
                            authorities
                    );
            SecurityContextHolder.getContext().setAuthentication(authentication); // Contexto de segurança

        }
        filterChain.doFilter(request, response);

    }

    private String recoverToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization"); // Mudar para outro cabeçalho caso seja necessário
        if(authHeader == null) {
            return null;
        }
        return authHeader.replace("Bearer ", "");
    }
}
