# plug-meter

The application plug-meter persists the meter value of a Shelly Plug or Shelly Plug S.

## Usage

1. Go to the Shelly Plug (S) web interface &rarr; settings page "Internet & Security" &rarr; "Advanced - Developer Settings".
2. Apply the following settings:
   - MQTT enabled
   - MQTT username and password
   - Server with port 1883
   - Will topic, e.g. shellies/shellyplug-s-AB1234/online for a device with an ID AB1234
   - Will message: false
3. Clone this repository and create an `application.env` file at root level with a content like this:
   ```
   PLUG_MODEL=shellyplug-s
   PLUG_DEVICE_ID=AB1234
   MQTT_USERNAME=admin
   MQTT_PASSWORD=secret
   ```
4. Reference the appropriate Dockerfile depending on your host platform in the `docker-compose.yml`.
5. Start the application with `docker compose up -d`.
6. Visit http://localhost:4001/ for the current meter value.

## Disclaimer

The author of this software is in no way affiliated to Allterco. All naming rights for Shelly are property of Allterco.
