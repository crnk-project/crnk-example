package io.crnk.example.service.repository.change;

import com.google.common.reflect.TypeToken;
import io.crnk.core.engine.information.InformationBuilder;
import io.crnk.core.engine.information.contributor.ResourceFieldContributor;
import io.crnk.core.engine.information.contributor.ResourceFieldContributorContext;
import io.crnk.core.engine.information.resource.ResourceField;
import io.crnk.core.engine.information.resource.ResourceFieldAccessor;
import io.crnk.core.engine.information.resource.ResourceFieldType;
import io.crnk.core.resource.annotations.LookupIncludeBehavior;
import io.crnk.example.service.model.AttributeChange;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

/**
 * Warning: rather an advanced use case where resources are modified on-the-fly by adding further fields to it.
 * <p>
 * In practive one rather explicitly defines a @JsonApiRelation . This
 * is simpler and recommended, but may not always be possible if the resource cannot be change.
 * <p>
 * FIXME lookup ResourceFieldContributor during crnk boot process
 */
@Component
public class AttributeChangeFieldProvider implements ResourceFieldContributor {

    @Override
    public List<ResourceField> getResourceFields(ResourceFieldContributorContext context) {
        InformationBuilder.FieldInformationBuilder fieldBuilder = context.getInformationBuilder().createResourceField();
        fieldBuilder.name("attributeChanges");
        fieldBuilder.genericType(new TypeToken<List<AttributeChange>>() {
        }.getType());
        fieldBuilder.oppositeResourceType(AttributeChange.RESOURCE_TYPE);
        fieldBuilder.fieldType(ResourceFieldType.RELATIONSHIP);

        // field values are "null" on resource and we make use of automated lookup to the relationship repository
        // instead:
        fieldBuilder.lookupIncludeBehavior(LookupIncludeBehavior.AUTOMATICALLY_ALWAYS);
        fieldBuilder.accessor(new ResourceFieldAccessor() {
            @Override
            public Object getValue(Object resource) {
                return null;
            }

            @Override
            public void setValue(Object resource, Object fieldValue) {
            }

            @Override
            public Class getImplementationClass() {
                return List.class;
            }
        });
        return Arrays.asList(fieldBuilder.build());
    }
}