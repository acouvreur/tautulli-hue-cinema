package main

import (
	"crypto/tls"
	"errors"
	"fmt"
	"log/slog"
	"net/http"
	"os"
	"runtime"
	"strconv"

	"github.com/amimof/huego"
)

// Build information. Populated at build-time.
var (
	Version   string
	Revision  string
	Branch    string
	BuildUser string
	BuildDate string
	GoVersion = runtime.Version()
)

func main() {
	// Disable TLS verification
	http.DefaultTransport.(*http.Transport).TLSClientConfig = &tls.Config{InsecureSkipVerify: true}

	bridge := huego.New(os.Getenv("HUE_BRIDGE_HOST"), os.Getenv("HUE_USERNAME"))

	groupId, err := strconv.Atoi(os.Getenv("HUE_GROUP_ID"))
	if err != nil {
		panic(err)
	}

	group, err := bridge.GetGroup(groupId)
	if err != nil {
		panic(err)
	}

	http.HandleFunc("/turn_on", func(w http.ResponseWriter, r *http.Request) {
		err := group.On()
		if err != nil {
			w.WriteHeader(500)
			w.Write([]byte(err.Error()))
			slog.Error(err.Error())
			return
		}
		w.Write([]byte("OK"))
	})

	http.HandleFunc("/turn_off", func(w http.ResponseWriter, r *http.Request) {
		err := group.Off()
		if err != nil {
			w.WriteHeader(500)
			w.Write([]byte(err.Error()))
			slog.Error(err.Error())
			return
		}
		w.Write([]byte("OK"))
	})

	slog.Info(fmt.Sprintf("Listening on port :8080 %s", Info()))
	err = http.ListenAndServe(":8080", nil)
	if errors.Is(err, http.ErrServerClosed) {
		fmt.Printf("server closed\n")
	} else if err != nil {
		fmt.Printf("error starting server: %s\n", err)
		os.Exit(1)
	}
}

// Info returns version, branch and revision information.
func Info() string {
	return fmt.Sprintf("(version=%s, branch=%s, revision=%s)", Version, Branch, Revision)
}
