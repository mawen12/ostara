package dev.krud.boost.daemon.configuration.instance

import dev.krud.boost.daemon.actuator.ActuatorHttpClient
import dev.krud.boost.daemon.configuration.authentication.Authentication
import dev.krud.boost.daemon.configuration.instance.entity.Instance
import java.util.*

interface InstanceActuatorClientProvider {
    fun provide(instance: Instance): ActuatorHttpClient

    fun provide(instanceId: UUID): ActuatorHttpClient

    fun provideForUrl(url: String, authentication: Authentication = Authentication.None.DEFAULT): ActuatorHttpClient

    fun <T> doWith(instanceId: UUID, block: (ActuatorHttpClient) -> T): T {
        val actuatorClient = provide(instanceId)
        return block(actuatorClient)
    }

    fun <T> doWith(instance: Instance, block: (ActuatorHttpClient) -> T): T {
        val actuatorClient = provide(instance)
        return block(actuatorClient)
    }
}