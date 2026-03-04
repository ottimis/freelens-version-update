import { Renderer } from "@freelensapp/extensions";
import { DeploymentVersionUpdate } from "./deployment-version-update"
import { StatefulSetVersionUpdate } from "./statefulset-version-update"
import { CronJobVersionUpdate } from "./cronjob-version-update"

export default class VersionUpdateExtension extends Renderer.LensExtension {
  kubeObjectDetailItems = [
    {
      kind: "Deployment",
      apiVersions: ["apps/v1"],
      priority: 20,
      components: {
        Details: (props: any) => (<DeploymentVersionUpdate {...props} />)
      }
    },
    {
      kind: "StatefulSet",
      apiVersions: ["apps/v1"],
      priority: 20,
      components: {
        Details: (props: any) => (<StatefulSetVersionUpdate {...props} />)
      }
    },
    {
      kind: "CronJob",
      apiVersions: ["batch/v1"],
      priority: 20,
      components: {
        Details: (props: any) => (<CronJobVersionUpdate {...props} />)
      }
    }
  ]
}
