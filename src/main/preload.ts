import { contextBridge } from 'electron';
import { actuatorBridge } from '../infra/actuator/renderer';
import { configurationServiceBridge, configurationStoreBridge } from '../infra/configuration/renderer';
import { utilsBridge } from '../infra/rendererUtils/renderer';
import { subscriptionsBridge } from '../infra/subscriptions/renderer';
import { instanceServiceBridge } from '../infra/instance/renderer';
import { uiServiceBridge } from '../infra/ui/renderer';
import { daemonAddressSupplier } from '../infra/daemon/renderer';

contextBridge.exposeInMainWorld('electron', {
  configurationStore: configurationStoreBridge,
});
contextBridge.exposeInMainWorld('actuator', actuatorBridge);
contextBridge.exposeInMainWorld('configuration', configurationServiceBridge);
contextBridge.exposeInMainWorld('utils', utilsBridge);
contextBridge.exposeInMainWorld('subscriptions', subscriptionsBridge);
contextBridge.exposeInMainWorld('instance', instanceServiceBridge);
contextBridge.exposeInMainWorld('ui', uiServiceBridge);
contextBridge.exposeInMainWorld('isElectron', true);
contextBridge.exposeInMainWorld('daemonAddress', daemonAddressSupplier());
