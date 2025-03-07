package dev.krud.boost.daemon.configuration.folder.validation

import dev.krud.boost.daemon.configuration.folder.entity.Folder
import dev.krud.crudframework.crud.handler.krud.Krud
import jakarta.validation.Constraint
import jakarta.validation.ConstraintValidator
import jakarta.validation.ConstraintValidatorContext
import jakarta.validation.Payload
import org.springframework.stereotype.Component
import java.util.*
import kotlin.reflect.KClass

@Constraint(validatedBy = [FolderIdOrNullValidator::class])
@Target(AnnotationTarget.FIELD, AnnotationTarget.PROPERTY, AnnotationTarget.VALUE_PARAMETER, AnnotationTarget.FUNCTION, AnnotationTarget.PROPERTY_GETTER)
annotation class ValidFolderIdOrNull(val message: String = "Invalid folder ID", val groups: Array<KClass<*>> = [], val payload: Array<KClass<out Payload>> = [])

@Component
class FolderIdOrNullValidator(
    private val folderKrud: Krud<Folder, UUID>
) : ConstraintValidator<ValidFolderIdOrNull, UUID> {
    override fun isValid(value: UUID?, context: ConstraintValidatorContext?): Boolean {
        return value == null || folderKrud.showById(value) != null // TODO: we should do a count query instead of a full select
    }
}