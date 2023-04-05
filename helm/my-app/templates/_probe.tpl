{{- define "my-app.probe" -}}
  {{- $ := index . 0 }}
  {{- $app := index . 1 }}
          startupProbe:
            httpGet:
              path: {{ $app.livenessProbe | default "/liveness" }}
              port: {{ $app.port | default 3000 }}
            initialDelaySeconds: 5 
            periodSeconds: 4
            timeoutSeconds: 3
            successThreshold: 1
            failureThreshold: {{ $app.startupFailureThreshold | default 10 }}
          livenessProbe:
            httpGet:
              path: {{ $app.livenessProbe | default "/liveness" }}
              port: {{ $app.port | default 3000 }}
            initialDelaySeconds: 5
            periodSeconds: 10
            timeoutSeconds: 4
            successThreshold: 1
            failureThreshold: 2
          readinessProbe:
            httpGet:
              path: {{ $app.readinessProbe | default "/readiness" }}
              port: {{ $app.port | default 3000 }}
            initialDelaySeconds: 0
            periodSeconds: 2
            timeoutSeconds: 1
            successThreshold: 1
            failureThreshold: 2
{{- end }}
