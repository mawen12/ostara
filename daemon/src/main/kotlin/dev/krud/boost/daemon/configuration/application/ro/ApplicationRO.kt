package dev.krud.boost.daemon.configuration.application.ro

import dev.krud.boost.daemon.configuration.application.enums.ApplicationType
import java.util.*

class ApplicationRO(
    val id: UUID,
    val alias: String,
    var type: ApplicationType,
    val description: String? = null,
    val color: String? = null,
    val icon: String? = null,
    val sort: Int? = null,
    val parentFolderId: UUID? = null,
)

