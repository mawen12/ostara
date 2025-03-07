package dev.krud.boost.daemon.configuration.application.crud

import dev.krud.boost.daemon.configuration.application.entity.Application
import dev.krud.boost.daemon.configuration.application.messaging.ApplicationCreatedEventMessage
import dev.krud.boost.daemon.configuration.application.messaging.ApplicationDeletedEventMessage
import dev.krud.boost.daemon.configuration.application.messaging.ApplicationUpdatedEventMessage
import dev.krud.crudframework.crud.hooks.interfaces.CreateFromHooks
import dev.krud.crudframework.crud.hooks.interfaces.CreateHooks
import dev.krud.crudframework.crud.hooks.interfaces.DeleteHooks
import dev.krud.crudframework.crud.hooks.interfaces.UpdateFromHooks
import dev.krud.crudframework.crud.hooks.interfaces.UpdateHooks
import org.springframework.integration.channel.PublishSubscribeChannel
import org.springframework.stereotype.Component
import java.util.*

@Component
class ApplicationEventPersistentHooks(
    private val systemEventsChannel: PublishSubscribeChannel
) : CreateHooks<UUID, Application>, CreateFromHooks<UUID, Application>, UpdateHooks<UUID, Application>, UpdateFromHooks<UUID, Application>, DeleteHooks<UUID, Application> {
    override fun postCreate(entity: Application) {
        systemEventsChannel.send(ApplicationCreatedEventMessage(ApplicationCreatedEventMessage.Payload(entity.id)))
    }

    override fun postCreateFrom(entity: Application) {
        systemEventsChannel.send(ApplicationCreatedEventMessage(ApplicationCreatedEventMessage.Payload(entity.id)))
    }

    override fun postUpdate(entity: Application) {
        systemEventsChannel.send(ApplicationUpdatedEventMessage(ApplicationUpdatedEventMessage.Payload(entity.id)))
    }

    override fun postUpdateFrom(entity: Application) {
        systemEventsChannel.send(ApplicationUpdatedEventMessage(ApplicationUpdatedEventMessage.Payload(entity.id)))
    }

    override fun postDelete(entity: Application) {
        systemEventsChannel.send(ApplicationDeletedEventMessage(ApplicationDeletedEventMessage.Payload(entity.id)))
    }
}