package io.crnk.example.service.domain.repository;

import com.google.common.reflect.TypeToken;
import io.crnk.core.engine.information.InformationBuilder;
import io.crnk.core.engine.information.contributor.ResourceFieldContributor;
import io.crnk.core.engine.information.contributor.ResourceFieldContributorContext;
import io.crnk.core.engine.information.resource.ResourceField;
import io.crnk.core.engine.information.resource.ResourceFieldAccessor;
import io.crnk.core.engine.information.resource.ResourceFieldType;
import io.crnk.core.resource.annotations.LookupIncludeBehavior;
import java.util.Arrays;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class HistoryFieldProvider implements ResourceFieldContributor {

	@Override
	public List<ResourceField> getResourceFields(ResourceFieldContributorContext context) {
		// this method could be omitted if the history field is added regularly to historized resources. This
		// would be simpler and recommended, but may not always be possible. Here we demonstrate doing it dynamically.
		// this way we can also add new relationships to Jpa entities. You may also make use of it to introduce
		// any other kind of field
		InformationBuilder.Field fieldBuilder = context.getInformationBuilder().createResourceField();
		fieldBuilder.name("history");
		fieldBuilder.genericType(new TypeToken<List<History>>() {
		}.getType());
		fieldBuilder.oppositeResourceType("history");
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
		});
		return Arrays.asList(fieldBuilder.build());
	}
}