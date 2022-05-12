Name: cockpit-enclave
Version: 0.1.9.0
Release: 1%{?dist}
Summary: An Enclave plugin for Cockpit
BuildArch: noarch

License: GPL

Source0: %{name}-%{version}.tar.gz

Requires: cockpit bash enclave

%description
A plugin to monitor Enclave in cockpit

%prep
%setup -q

%install
rm -rf $RPM_BUILD_ROOT
mkdir -p $RPM_BUILD_ROOT/%{_datadir}/cockpit/enclave
cp -r * $RPM_BUILD_ROOT/%{_datadir}/cockpit/enclave

%files
%{_datadir}/cockpit/enclave/*



%changelog
* Wed Dec 08 2021 Enclave Networks <support@enclave.io>
- First version being packaged
