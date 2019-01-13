package io.crnk.example.service.jpa;

import io.crnk.jpa.JpaEntityRepositoryBase;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class RoleRepository extends JpaEntityRepositoryBase<RoleEntity, UUID> {

    public RoleRepository() {
        super(RoleEntity.class);
    }
}
