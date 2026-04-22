package br.com.uninassau.LEI.ConectaPraia;

public class EmailAlreadyInUseException extends RuntimeException {

    public EmailAlreadyInUseException() {
        super("email já existe");
    }
}
