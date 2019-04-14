package io.crnk.example.service.repository.schedule;

import io.crnk.data.jpa.JpaEntityRepositoryBase;
import io.crnk.example.service.model.ScheduleEntity;
import org.springframework.stereotype.Component;

@Component
public class ScheduleRepository extends JpaEntityRepositoryBase<ScheduleEntity, Long> {

    public ScheduleRepository() {
        super(ScheduleEntity.class);
    }
}
