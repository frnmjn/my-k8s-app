const { metrics } = require("@opentelemetry/api");
const { NodeSDK } = require("@opentelemetry/sdk-node");
const {
  getNodeAutoInstrumentations,
} = require("@opentelemetry/auto-instrumentations-node");
const { Resource } = require("@opentelemetry/resources");
const {
  SemanticResourceAttributes,
} = require("@opentelemetry/semantic-conventions");
const {
  OTLPTraceExporter,
} = require("@opentelemetry/exporter-trace-otlp-http");
const {
  MeterProvider,
  PeriodicExportingMetricReader,
} = require("@opentelemetry/sdk-metrics");
const {
  OTLPMetricExporter,
} = require("@opentelemetry/exporter-metrics-otlp-http");

const resource = Resource.default().merge(
  new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: process.env.SERVICE_NAME,
  })
);

const traceExporter = new OTLPTraceExporter({
  url: `${
    process.env.OTEL_COLLECTOR
      ? process.env.OTEL_COLLECTOR + "/v1/traces"
      : "http://localhost:4318/v1/traces"
  }`,
  headers: {},
});

const metricExporter = new OTLPMetricExporter({
  url: `${
    process.env.OTEL_COLLECTOR + "/v1/metrics" ||
    "http://localhost:4318/v1/metrics"
  }`,
  concurrencyLimit: 1,
});

const meterProvider = new MeterProvider({
  resource: resource,
});

const metricReader = new PeriodicExportingMetricReader({
  exporter: metricExporter,

  // Default is 60000ms (60 seconds). Set to 3 seconds for demonstrative purposes only.
  exportIntervalMillis: 3000,
});

meterProvider.addMetricReader(metricReader);

// Set this MeterProvider to be global to the app being instrumented.
metrics.setGlobalMeterProvider(meterProvider);

const getMeter = function getMeter() {
  return metrics.getMeter(process.env.SERVICE_NAME || "");
};

const sdk = new NodeSDK({
  resource,
  traceExporter,
  instrumentations: [getNodeAutoInstrumentations()],
});

// initialize the SDK and register with the OpenTelemetry API
// this enables the API to record telemetry
sdk.start();

// gracefully shut down the SDK on process exit
process.on("SIGTERM", () => {
  sdk
    .shutdown()
    .then(() => console.log("Tracing terminated"))
    .catch((error) => console.log("Error terminating tracing", error))
    .finally(() => process.exit(0));
});

module.exports = { getMeter };
