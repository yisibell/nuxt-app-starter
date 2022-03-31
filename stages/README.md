# Stages

各阶段发布自动化配置。

## Example

### ft

``` conf
[program:pm2]
command=npm run pm2:start-ft
;numprocs=1                                                               ; number of processes copies to start (def 1)
directory=/var/www/http/luban-test/                                     ; directory to cwd to before exec (def no cwd)
;autostart=true                                                           ; start at supervisord start (default: true)
;autorestart=true                                                         ; retstart at unexpected quit (default: true)
startsecs=3                                                             ; number of secs prog must stay running (def. 1)
;startretries=3                                                           ; max # of serial start failures (default 3)
;exitcodes=0,2                                                            ; 'expected' exit codes for process (default 0,2)
;stopsignal=TERM                                                          ; signal used to kill process (default TERM)
;stopwaitsecs=10                                                          ; max num secs to wait b4 SIGKILL (default 10)
redirect_stderr=true                                                     ; redirect proc stderr to stdout (default false)
stdout_logfile=/var/log/frontwatch-web-stdout.log                        ; stderr log path, NONE for none; default AUTO
stdout_logfile_maxbytes=64MB                                             ; max # logfile bytes b4 rotation (default 50MB)
stdout_logfile_backups=4                                                 ; # of stdout logfile backups (default 10)
stdout_capture_maxbytes=1MB                                              ; number of bytes in 'capturemode' (default 0)
;stdout_events_enabled=false                                              ; emit events on stdout writes (default false)
```