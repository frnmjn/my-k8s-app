{{/*
Common labels
*/}}
{{- define "my-app.labels" -}}
  {{- $ := index . 0 }}
  {{- $app := index . 1 }}
  {{- with index . 1 }}
    helm.sh/chart: {{ $.Chart.Name }}
    {{- include "my-app.selectorLabels" (list $ $app) }}
    app.kubernetes.io/managed-by: {{ $.Release.Service }}
  {{- end }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "my-app.selectorLabels" -}}
  {{- $ := index . 0 }}
  {{- $app := index . 1 }}
  {{- with index . 1 }}
    app.kubernetes.io/name: {{ $app.name | default $.Chart.Name }}
    app.kubernetes.io/instance: {{ $app.name | default $.Chart.Name }}
  {{- end }}
{{- end }}
