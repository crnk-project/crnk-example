package io.crnk.example.service.jpa;

import io.crnk.jpa.JpaEntityRepositoryBase;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class ScheduleRepository extends JpaEntityRepositoryBase<ScheduleEntity, UUID> {

    public ScheduleRepository() {
        super(ScheduleEntity.class);
    }
}
