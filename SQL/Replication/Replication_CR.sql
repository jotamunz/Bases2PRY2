-- Enabling the replication database
use master
exec sp_replicationdboption @dbname = N'SQL_VENTAS_MAIN', @optname = N'publish', @value = N'true'
GO

exec [SQL_VENTAS_MAIN].sys.sp_addlogreader_agent @job_login = N'JOS-PC\repl_logreader', @job_password = null, @publisher_security_mode = 1
GO
-- Adding the transactional publication
use [SQL_VENTAS_MAIN]
exec sp_addpublication @publication = N'ReplicationCR', @description = N'Transactional publication of database ''SQL_VENTAS_MAIN'' from Publisher ''JOS-PC''.', @sync_method = N'concurrent', @retention = 0, @allow_push = N'true', @allow_pull = N'true', @allow_anonymous = N'true', @enabled_for_internet = N'false', @snapshot_in_defaultfolder = N'true', @compress_snapshot = N'false', @ftp_port = 21, @ftp_login = N'anonymous', @allow_subscription_copy = N'false', @add_to_active_directory = N'false', @repl_freq = N'continuous', @status = N'active', @independent_agent = N'true', @immediate_sync = N'true', @allow_sync_tran = N'false', @autogen_sync_procs = N'false', @allow_queued_tran = N'false', @allow_dts = N'false', @replicate_ddl = 1, @allow_initialize_from_backup = N'false', @enabled_for_p2p = N'false', @enabled_for_het_sub = N'false'
GO


exec sp_addpublication_snapshot @publication = N'ReplicationCR', @frequency_type = 1, @frequency_interval = 0, @frequency_relative_interval = 0, @frequency_recurrence_factor = 0, @frequency_subday = 0, @frequency_subday_interval = 0, @active_start_time_of_day = 0, @active_end_time_of_day = 235959, @active_start_date = 0, @active_end_date = 0, @job_login = N'JOS-PC\repl_snapshot', @job_password = null, @publisher_security_mode = 1
exec sp_grant_publication_access @publication = N'ReplicationCR', @login = N'sa'
GO
exec sp_grant_publication_access @publication = N'ReplicationCR', @login = N'JOS-PC\JOS'
GO
exec sp_grant_publication_access @publication = N'ReplicationCR', @login = N'JOS-PC\repl_distribution'
GO
exec sp_grant_publication_access @publication = N'ReplicationCR', @login = N'NT SERVICE\Winmgmt'
GO
exec sp_grant_publication_access @publication = N'ReplicationCR', @login = N'NT SERVICE\SQLWriter'
GO
exec sp_grant_publication_access @publication = N'ReplicationCR', @login = N'NT SERVICE\SQLSERVERAGENT'
GO
exec sp_grant_publication_access @publication = N'ReplicationCR', @login = N'NT Service\MSSQLSERVER'
GO
exec sp_grant_publication_access @publication = N'ReplicationCR', @login = N'distributor_admin'
GO

-- Adding the transactional articles
use [SQL_VENTAS_MAIN]
exec sp_addarticle @publication = N'ReplicationCR', @article = N'VENTAS', @source_owner = N'dbo', @source_object = N'VENTAS', @type = N'logbased', @description = N'', @creation_script = N'', @pre_creation_cmd = N'drop', @schema_option = 0x000000000803509F, @identityrangemanagementoption = N'manual', @destination_table = N'VENTAS', @destination_owner = N'dbo', @status = 24, @vertical_partition = N'false', @ins_cmd = N'CALL [sp_MSins_dboVENTAS]', @del_cmd = N'CALL [sp_MSdel_dboVENTAS]', @upd_cmd = N'SCALL [sp_MSupd_dboVENTAS]', @filter_clause = N'[Moneda] = N''CRC'''

-- Adding the article filter
exec sp_articlefilter @publication = N'ReplicationCR', @article = N'VENTAS', @filter_name = N'FLTR_VENTAS_1__55', @filter_clause = N'[Moneda] = N''CRC''', @force_invalidate_snapshot = 1, @force_reinit_subscription = 1

-- Adding the article synchronization object
exec sp_articleview @publication = N'ReplicationCR', @article = N'VENTAS', @view_name = N'SYNC_VENTAS_1__55', @filter_clause = N'[Moneda] = N''CRC''', @force_invalidate_snapshot = 1, @force_reinit_subscription = 1
GO

-- Adding the transactional subscriptions
use [SQL_VENTAS_MAIN]
exec sp_addsubscription @publication = N'ReplicationCR', @subscriber = N'JOS-PC', @destination_db = N'SQL_VENTAS_CR', @subscription_type = N'Push', @sync_type = N'automatic', @article = N'all', @update_mode = N'read only', @subscriber_type = 0
exec sp_addpushsubscription_agent @publication = N'ReplicationCR', @subscriber = N'JOS-PC', @subscriber_db = N'SQL_VENTAS_CR', @job_login = N'JOS-PC\repl_distribution', @job_password = null, @subscriber_security_mode = 1, @frequency_type = 64, @frequency_interval = 1, @frequency_relative_interval = 1, @frequency_recurrence_factor = 0, @frequency_subday = 4, @frequency_subday_interval = 5, @active_start_time_of_day = 0, @active_end_time_of_day = 235959, @active_start_date = 0, @active_end_date = 0, @dts_package_location = N'Distributor'
GO

