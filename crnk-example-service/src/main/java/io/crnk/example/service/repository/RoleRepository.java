package io.crnk.example.service.repository;

import io.crnk.data.jpa.JpaEntityRepositoryBase;
import io.crnk.example.service.model.RoleEntity;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class RoleRepository extends JpaEntityRepositoryBase<RoleEntity, UUID> {

    public RoleRepository() {
        super(RoleEntity.class);
    }
}
